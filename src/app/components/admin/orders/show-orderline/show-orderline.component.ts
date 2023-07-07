import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderLine } from 'src/app/models/orderLine';
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/admin/orders/orders.service';

@Component({
  selector: 'app-show-orderline',
  templateUrl: './show-orderline.component.html',
  styleUrls: ['./show-orderline.component.css']
})
export class ShowOrderlineComponent {
  public selectedOrder = new Orders();
  
  // declare public fileName: string;
  // declare public pictureFile: File;
  declare orderLines : any;
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
   
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ordersService.getOrder(id).pipe().subscribe({
      next: (data: Orders) => {
        this.selectedOrder = data;
        this.orderLines = this.selectedOrder.listOrderLines
        console.log(data);
        console.log(this.orderLines);
        
        
      },
      complete: () => console.log('ok')

    }
    )
  }

}
