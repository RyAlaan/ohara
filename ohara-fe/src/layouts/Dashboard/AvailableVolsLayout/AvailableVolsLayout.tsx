const AvailableVolsLayout = () => {
  return (
    <div className="col-span-12 md:col-span-7 min-h-96 p-6 bg-white rounded-md">
      <table>
        <thead className="border-b border-dashed">
          <tr>
            <th className="min-w-24 py-3 text-start text-sm font-semibold">
              Code
            </th>
            <th className="w-28  py-3 text-start text-sm font-semibold">
              Manga
            </th>
            <th className="w-16  py-3 text-end text-sm font-semibold">Vols</th>
            <th className="w-32  py-3 text-end text-sm font-semibold">
              Status
            </th>
            <th className="w-20  py-3 text-end text-sm font-semibold">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-dashed">
            <td className=" py-3 text-sm">#00001</td>
            <td className=" py-3 text-sm">Vinland Saga</td>
            <td className=" py-3 text-sm text-end">14</td>
            <td className=" py-3 text-sm text-end">Low Stock</td>
            <td className=" py-3 text-sm text-end">4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AvailableVolsLayout;
