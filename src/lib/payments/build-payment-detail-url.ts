export default function buildPaymentDetailUrl(id: string, trxRef?: string) {
  const trxRefParam = trxRef ? `${trxRef}` : '';

  return `/payments/${id}/${trxRefParam}`;
}
