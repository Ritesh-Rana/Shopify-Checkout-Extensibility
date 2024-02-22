import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useSettings,
  useApplyCartLinesChange,
  useCartLines,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.shipping-option-list.render-before',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const allEditorSettings = useSettings();
  
  let CartItems = useCartLines();
  console.log(CartItems);
  return (
    <Banner title={allEditorSettings.title ?? "Default title" } status={allEditorSettings.status ?? "info"} collapsible={allEditorSettings.collapsible ?? true}>
    {allEditorSettings.description ?? "Default Description"}
  </Banner>
  );
}