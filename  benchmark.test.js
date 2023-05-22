//COMPRESSION
const LZString = require('./compression/LZString.js')
const lzw = require('./compression/lzw.js')
const ULZSS = require('./compression/ULZSS.js')

// DATA
const sketch = require('./data/sketch.js')
const simplexNoise = require('./data/simplexNoise.js')
const triangle = require('./data/triangle.js')

const util = require('./compression/util.js')

function reversible(compress, decompress, source) {
	const encoded = compress(source)
	const decoded = decompress(encoded)
	expect(decoded).toBe(source)
}

const tests = [
	{
		it: "makes sure base64 compression of sketch is reversible",
		compress: btoa,
		decompress: atob,
		source: sketch
	}, {
		it: "makes sure base64 compression of simplexNoise is reversible",
		compress: btoa,
		decompress: atob,
		source: simplexNoise
	}, {
		it: "makes sure base64 compression of triangle is reversible",
		compress: btoa,
		decompress: atob,
		source: triangle
	}, {
		it: "makes sure ULZSS compression of sketch is reversible",
		compress: (s) => util.compress(s, ULZSS.encode),
		decompress: (s) => util.decompress(s, ULZSS.decode),
		source: sketch
	}, {
		it: "makes sure ULZSS compression of simplexNoise is reversible",
		compress: (s) => util.compress(s, ULZSS.encode),
		decompress: (s) => util.decompress(s, ULZSS.decode),
		source: simplexNoise
	}, {
		it: "makes sure ULZSS compression of triangle is reversible",
		compress: (s) => util.compress(s, ULZSS.encode),
		decompress: (s) => util.decompress(s, ULZSS.decode),
		source: triangle
	}, {
		it: "makes sure LZString compression of sketch is reversible",
		compress: LZString.compressToBase64,
		decompress: LZString.decompressFromBase64,
		source: sketch
	}, {
		it: "makes sure LZString compression of simplexNoise is reversible",
		compress: LZString.compressToBase64,
		decompress: LZString.decompressFromBase64,
		source: simplexNoise
	}, {
		it: "makes sure LZString compression of triangle is reversible",
		compress: LZString.compressToBase64,
		decompress: LZString.decompressFromBase64,
		source: triangle
	}, {
		it: "makes sure LZW compression of sketch is reversible",
		compress: (s)=>util.compress(s,lzw.encode),
		decompress: (s)=>util.decompress(s,lzw.decode),
		source: sketch
	}, {
		it: "makes sure LZW compression of simplexNoise is reversible",
		compress: (s)=>util.compress(s,lzw.encode),
		decompress: (s)=>util.decompress(s,lzw.decode),
		source: simplexNoise
	}, {
		it: "makes sure LZW compression of triangle is reversible",
		compress: (s)=>util.compress(s,lzw.encode),
		decompress: (s)=>util.decompress(s,lzw.decode),
		source: triangle
	}
]

tests.forEach(t => {
	it(t.it, () => reversible(t.compress, t.decompress, t.source))
})
