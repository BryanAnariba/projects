import { In } from "typeorm";
import { AppDataSource } from "../../config";
import { Order, Product, User } from "../../config/entity";
import { CreateOrderDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";
import { ProductByOrder } from "../../config/entity/ProductByOrder";

export class OrderService {

  constructor() {}

  public async createOrder (createOrderDto: CreateOrderDto) {
    let subtotal: number = 0;
    let total: number = 0;
    const orderRepository = AppDataSource.getRepository(Order);
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const productByOrderRepository = AppDataSource.getRepository(ProductByOrder);

    const [user, products] = await Promise.all([
      userRepository.findOneBy({id: createOrderDto.userId}),
      productRepository.findBy({id: In(createOrderDto.products.map(product => product.productId))}),
    ]);
    // TODO: validaciones, aun falta pulir esto, pero pienso que a este punto cumple lo minimo necesario, abria que testear
    products.forEach(p => {
      const productOfdto = createOrderDto.products.find(prod => prod.productId === p.id);
      if ((p.stock - productOfdto.quantityProduct) < 0) throw CustomError.badRequest(`${p.name} quantity in stock is less than the quantity of do you want, stock=${p.stock}, need=${productOfdto.quantityProduct}`);
    });
    
    // TODO: modificamos el stock
    createOrderDto.products.forEach(async product => {
      subtotal += product.productValue * product.quantityProduct;
      total += product.productValue * product.quantityProduct;
      const p = await productRepository.findOneBy({id: product.productId});
      p.stock = p.stock - product.quantityProduct;
      await productRepository.save({...p});
    });
    // TODO: creamos la orden
    const order = await orderRepository.save({
      subTotal: subtotal,
      total: total + (total * 0.11), // SUPONGAMOS EL ESTANDAR 11% DE TAX O ISV ESTO PUEDE VARIAR DEL PAIS
      isActive: true,
      user: user,
    });
    // TODO: creamos los productos por orden
    createOrderDto.products.map(async(p) => {
      await productByOrderRepository.save({
        order: {id: order.id}, 
        product: {id: p.productId}, 
        productValue: p.productValue, 
        quantityProduct: p.quantityProduct
      });
    });

    return order;
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
          productsByOrder: true,
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