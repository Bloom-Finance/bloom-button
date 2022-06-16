# bloom-button

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description | Type                                                     | Default     |
| ---------------- | ---------------- | ----------- | -------------------------------------------------------- | ----------- |
| `callback_url`   | `callback-url`   |             | `string`                                                 | `undefined` |
| `consumer_email` | `consumer-email` |             | `string`                                                 | `undefined` |
| `consumer_name`  | `consumer-name`  |             | `string`                                                 | `undefined` |
| `items`          | --               |             | `{ amount: number; description: string; id: string; }[]` | `undefined` |
| `label`          | `label`          |             | `string`                                                 | `undefined` |
| `merchant`       | `merchant`       |             | `string`                                                 | `undefined` |


## Events

| Event       | Description | Type                                                            |
| ----------- | ----------- | --------------------------------------------------------------- |
| `oncancel`  |             | `CustomEvent<{ status: number; }>`                              |
| `onerror`   |             | `CustomEvent<{ status: number; }>`                              |
| `onsuccess` |             | `CustomEvent<{ status: number; order: any; payment: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
