import { notFound } from "next/navigation";
// Route unmatched paths through the active language's layout and 404 page.
export default function MissingPage() {
  notFound();
}
