import AddProductForm from "./add-product-form";

export const metadata = {
  title: "Add Product | Ayesha Gul Admin",
};

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#2c1a0e] p-6 text-white">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="mt-1 text-sm text-white/50">
          Upload a new product — image goes to Cloudinary, data to database.
        </p>
      </div>
      <AddProductForm />
    </div>
  );
}
