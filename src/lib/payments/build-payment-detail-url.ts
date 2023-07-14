export default function buildPaymentDetailUrl({
  id,
  trxRef,
  trxType,
}: {
  id: string;
  trxRef?: string;
  trxType?: string;
}) {
  const trxRefParam = trxRef ? `${trxRef}` : "";
  const trxTypeParam = trxType ? `${trxType}` : "";

  return `/payments/${id}/${trxRefParam}/${trxTypeParam}`;
}
