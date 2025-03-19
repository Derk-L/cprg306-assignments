export default function Item(props) {
  return (
    <li
      className="items-center p-4 m-4 bg-pink-50 max-w-sm border-b border-gray-400 rounded-md cursor-pointer hover:bg-pink-100"
      onClick={() => props.onSelect(props.name)}
    >
      <span className="font-semibold text-lg">{props.name}</span>
      <span className="text-gray-600 mr-4">{props.quantity}x</span>
      <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm">
        {props.category}
      </span>
    </li>
  );
}

  