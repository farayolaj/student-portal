export function toPortalDocument(doc: any): PortalDocument {
  return {
    id: doc.slug,
    title: doc.name,
    url: doc.print_url,
    fileType: "pdf",
    programme: doc.programme,
    session: doc.session,
    semester: doc.semester,
  };
}
