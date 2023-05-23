//COMPRESSION
const LZString = require('./compression/LZString.js')
const lzw = require('./compression/lzw.js')
const ULZSS = require('./compression/ULZSS.js')
const flate = require('wasm-flate')
const util = require('./compression/util.js')

// DATA
const sketch = require('./data/sketch.js')
const simplexNoise = require('./data/simplexNoise.js')
const triangle = require('./data/triangle.js')
const modele = require('./data/modele.js')
const quil = require('./data/quil.js')
const data = [
	{ title: "sketch", source: sketch },
	{ title: "simplexNoise", source: simplexNoise },
	{ title: "triangle", source: triangle },
	{ title: "modele", source: modele },
	{ title: "quil", source: quil },
]

const algorithms = [
	{
		title: "no compression",
		encode: (s) => s,
		decode: (s) => s
	}, {
		title: "base 64",
		encode: btoa,
		decode: atob
	}, {
		title: "u-lzss",
		encode: (s) => util.compress(s, ULZSS.encode),
		decode: (s) => util.decompress(s, ULZSS.decode)
	}, {
		title: "lz-string",
		encode: LZString.compressToBase64,
		decode: LZString.decompressFromBase64
	}, {
		title: "lzw",
		encode: (s) => util.compress(s, lzw.encode),
		decode: (s) => util.decompress(s, lzw.decode)
	}, {
		title: "gzip",
		encode: flate.gzip_encode,
		decode: flate.gzip_decode
	}, {
		title: "zlib",
		encode: flate.zlib_encode,
		decode: flate.zlib_decode
	}, {
		title: "deflate",
		encode: flate.deflate_encode,
		decode: flate.deflate_decode,
	},
]

const benchmarks = algorithms.map(algorithm => {
	return data.map(d => {
		return {
			title: d.title,
			source: d.source,
			compressionMethod: algorithm.title,
			compressFn: algorithm.encode
		}
	})
}).flat()

function benchmark(opts) {
	const length = opts.source.length;
	const encoded = opts.compressFn(opts.source);
	const encodedLength = encoded.length;
	const ratio = Math.floor(encodedLength / length * 10000.0) / 100.0;
	console.log(`${opts.title} - ${opts.compressionMethod}`)
	console.log(`Compressed length: ${encodedLength} chars`)
	console.log(`Compression ratio: ${ratio}%\n`)
	return encodedLength;
}

benchmarks.forEach(b => {
	benchmark(b)
})

module.exports = {
	data,
	algorithms
}
