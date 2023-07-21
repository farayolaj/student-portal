export default async function printHtml(html: string, filename: string) {
  const win = window.open("", filename) as Window;
  win.document.write(html);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  win.print();
  // win.close();
}
