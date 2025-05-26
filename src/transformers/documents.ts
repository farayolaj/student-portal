/* eslint-disable @typescript-eslint/no-explicit-any */
export function toPortalDocument(doc: any): PortalDocument {
  return {
    id: doc.slug,
    title: doc.name,
    url: doc.print_url,
    fileType: "pdf",
    programme: doc.programme,
    session: doc.session,
    semester: doc.semester,
    prerequisite: doc.prerequisite_fee_readable
      ? {
          name: doc.prerequisite_fee_readable,
          hasPaid: doc.has_paid_prerequisite_fee == "1",
        }
      : undefined,
  };
}
