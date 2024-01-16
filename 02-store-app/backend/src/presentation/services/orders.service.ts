import { In } from "typeorm";
import { AppDataSource } from "../../config";
import { Order, Product, User } from "../../config/entity";
import { CreateOrderDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class OrderService {

  constructor() {}

  public async createOrder (createOrderDto: CreateOrderDto) {
    const orderRepository = AppDataSource.getRepository(Order);
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);

    const [user, products] = await Promise.all([
      userRepository.findOneBy({id: createOrderDto.userId}),
      productRepository.findBy({id: In(createOrderDto.products.map(product => product.productId))}),
    ]);

    products.forEach(p => {
      if (p.stock <= 0) throw CustomError.badRequest('Empty Stock of product ' + p.name);
    });

    let subtotal: number = 0;
    let total: number = 0;

    createOrderDto.products.forEach(async product => {
      subtotal += product.price * product.quantity;
      total += product.price * product.quantity;
      const p = await productRepository.findOneBy({id: product.productId});
      p.stock = p.stock - product.quantity;
      //console.log({p, newStock: p.stock})
      await productRepository.save({...p});
    });

    return await orderRepository.save({
      subTotal: subtotal,
      total: total + (total * 0.11), // SUPONGAMOS EL ESTANDAR 11% DE TAX O ISV ESTO PUEDE VARIAR DEL PAIS
      isActive: true,
      user: user,
      products: products,
    });
  }

  public async getOrders (paginationDto: PaginationDto, userId: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOneBy({id: userId});    
    if (!userFound) throw CustomError.badRequest('User not found');

    const [totalOrders, orders] = await Promise.all([
      orderRepository.count({
        where: {
          user: {
            id: userFound.id
          },
          deletedAt: null,
        },
      }),
      orderRepository.find({
        where: {
          user: {
            id: userFound.id
          },
          deletedAt: null
        },
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
        relations: {
          products: true,
          user: true
        },
      }),
    ])

    return {
      totalOrders,
      page: paginationDto.page,
      limit: paginationDto.limit,
      previusPage: (paginationDto.page - 1 > 0) ? `/api/v1/orders?page=${paginationDto.page - 1}&limit=${paginationDto.limit}` : null,
      currentPage: `/api/v1/orders?page=${paginationDto.page}&limit=${paginationDto.limit}`,
      nextPage: `/api/v1/orders?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      orders,
    }
  }
}