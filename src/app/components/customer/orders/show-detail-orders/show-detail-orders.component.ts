import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/customer/orders/orders.service';

@Component({
  selector: 'app-show-detail-orders',
  templateUrl: './show-detail-orders.component.html',
  styleUrls: ['./show-detail-orders.component.css']
})
export class ShowDetailOrdersComponent {
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
