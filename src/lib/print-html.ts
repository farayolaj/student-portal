export default async function printHtml(html: string, filename: string) {
  const win = window.open("", filename) as Window;
  win.document.write(html);
  win.print();
  win.close();
}
