export default function TextMagic(str) {
	var result = str.replace(/\| */g, "\n")
		.replace(/(http[a-zA-Z0-9\!\?\&\%\$\*\'\:\;\-\_\:\/\.]+)/g, "<a href='$1'>$1</a>");
	//more to come
	return result;
}
