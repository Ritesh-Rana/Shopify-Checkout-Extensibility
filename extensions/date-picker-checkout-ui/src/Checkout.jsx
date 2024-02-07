import {
  // Banner,
  // useApi,
  // useTranslate,
  reactExtension,
  DatePicker,
  useMetafield,
  useApplyMetafieldsChange
} from '@shopify/ui-extensions-react/checkout';
import { useState } from 'react';

// can see more locations for the block 
// https://shopify.dev/docs/api/checkout-ui-extensions/2023-04/extension-points-overview#dynamic-extension-points
export default reactExtension(
  // 'purchase.checkout.block.render',
  // 'purchase.checkout.payment-method-list.render-after',
  'purchase.checkout.shipping-option-list.render-after',
  () => <Extension />,
);

function Extension() {
  // const translate = useTranslate();
  // const { extension } = useApi();
  // const [deliveryDate,setDeliveryDate]=useState("");
  // const handleDateChange=(date)=>{
  //   setDeliveryDate(date);
  // }
  const metaDeliveryDate = useMetafield({namespace:'test', key:'deliveryDate'});
  const handlechangedate = useApplyMetafieldsChange();
  
  return (
    <DatePicker
      // selected={deliveryDate}
      // onChange={ handleDateChange}
      selected={metaDeliveryDate?.value}
      onChange={ (value)=>{handlechangedate({
        type: 'updateMetafield',
        namespace:'test',
        key:'deliveryDate',
        valueType:'string',
        value:value
      })}}
      // date formate should be YY-MM-DD
      // disabled={[{ start: '2024-02-01', end: '2024-02-10' }]}
      disabled={['2024-02-13']}
      // disabled={['Monday','Sunday']}
      // readOnly={[true]}
    />
  );
}