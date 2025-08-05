import { BuyReq, BuyResp } from '@app/proto/proto/service_order';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderServiceService {
  // eslint-disable-next-line @typescript-eslint/require-await
  async buy(payload: BuyReq): Promise<Partial<BuyResp>> {
    const { bookName } = payload;
    return {
      errorCode: {
        code: 0,
        message: 'success',
      },
      message: `您成功购买了${bookName}`,
    };
  }
}
