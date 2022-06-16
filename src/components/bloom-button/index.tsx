import { Component, Prop, h } from '@stencil/core';
import { EventEmitter, Event } from '../../../dist/types/stencil-public-runtime';
@Component({
  tag: 'bloom-button',
})
export class MyComponent {
  private retrieved_order: any;
  @Event() onsuccess: EventEmitter<{
    status: number;
    order: any;
    payment: string;
  }>;
  @Event() onerror: EventEmitter<{
    status: number;
  }>;
  @Event() oncancel: EventEmitter<{
    status: number;
  }>;
  @Prop() merchant: string;
  @Prop({
    attribute: 'consumer-name',
  })
  consumer_name: string;
  @Prop({
    attribute: 'callback-url',
  })
  callback_url: string;
  @Prop({
    attribute: 'consumer-email',
  })
  consumer_email: string;
  @Prop() label: string;
  @Prop() items: Array<{
    amount: number;
    description: string;
    id: string;
  }>;
  render() {
    const bloom_code = Object.fromEntries(new URLSearchParams(location.search)).bloom_code;
    if (bloom_code) {
      // call cloud function
      fetch('https://us-central1-bloom-trade.cloudfunctions.net/getOrderByBloomCode', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ bloomCode: bloom_code }),
      })
        .then(response => response.json())
        .then(json => {
          this.onsuccess.emit({
            status: 200,
            order: json.partialOrder,
            payment: json.payment_type,
          });
        })
        .catch(() => {
          this.onerror.emit({
            status: 400,
          });
        });
      return <div></div>;
    }
    return (
      <div>
        <button
          onClick={() => {
            fetch('https://us-central1-bloom-trade.cloudfunctions.net/createPreOrder', {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                orderData: {
                  items: this.items,
                  status: 'PENDING',
                  merchant: this.merchant,
                  isPreOrder: true,
                  consumer_info: {
                    name: this.consumer_name,
                    email: this.consumer_email ? this.consumer_email : undefined,
                  },
                  callback_url: location.href.replace(/\/$/, ''),
                },
              }),
            })
              .then(response => response.json())
              .then(json => {
                this.retrieved_order = json.order;
                document.location.href = `https://test-my.bloom.trade/checkout/${this.retrieved_order.id}`;
              })
              .catch(() => {
                this.onerror.emit({
                  status: 400,
                });
              });
          }}
        >
          {this.label}
        </button>
      </div>
    );
  }
}
