function toBase64(u8) {
    return btoa(String.fromCharCode.apply(null, u8));
}

function compress(s, fn) {
	const encoder = new TextEncoder();
	const encoded = encoder.encode(fn(s))
	return toBase64(encoded)
}

function decompress(s, fn) {
	const binaryString = atob(s)
	let bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i)
	}
	const decoder = new TextDecoder();
	const decoded = decoder.decode(bytes.buffer)
	return fn(decoded)
}

module.exports = {
	compress,
	decompress,
	toBase64
}
