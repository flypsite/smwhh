export default function TextMagic(str) {
	var result = str
		.replace(/\| */g, "\n")
//		.replace(/\[Link: (.*)\]/g, "<a href='$1'>$1</a>");
		.replace(/\[Link: (.*)\]/g, "$1");
	//more to come
	return result;
}
