# JavaScript String Compression Benchmarks
A repo to test the compression ratio (not performance!) of JavaScript client side string compression for encoding in the URL. The flow looks like this:
```
string --> compress(string) --> toBase64(compressedString)
```
The ratio is then measured by the length of the compressed base64 string. To run the benchmarks, run `yarn benchmark`. To run tests, run `yarn test`.

## Results

### Comparison by characters

|               | no compression | Base64 | ULZSS | LZString | LZW   | GZIP | ZLIB | DEFLATE |
|---------------|----------------|--------|-------|----------|-------|------|------|---------|
| sketch        | 1320           | 1760   | 1276  | 1100     | 1404  | 864  | 848  | 840     |
| simplex noise | 2936           | 3916   | 2768  | 2244     | 2968  | 1708 | 1692 | 1684    |
| quil          | 7745           | 10328  | 5572  | 4444     | 6096  | 3196 | 3180 | 3172    |
| triangle      | 9112           | 12152  | 5224  | 4876     | 6936  | 2808 | 2792 | 2784    |
| modele        | 23766          | 31688  | 15980 | 12292    | 19100 | 7776 | 7760 | 7752    |

### Comparison by ratio
|               | no compression | Base64  | u-lzss | lz-string | LZW     | GZIP   | ZLIB   | DEFLATE |
|---------------|----------------|---------|--------|-----------|---------|--------|--------|---------|
| sketch        | 100%           | 133.33% | 96.66% | 83.33%    | 106.36% | 65.45% | 64.24% | 63.63%  |
| simplex noise | 100%           | 133.37% | 94.27% | 76.43%    | 101.08% | 58.17% | 57.62% | 57.35%  |
| quil          | 100%           | 133.35% | 71.94% | 57.37%    | 78.70%  | 41.26% | 41.05% | 40.95%  |
| triangle      | 100%           | 133.33% | 57.33% | 53.51%    | 76.11%  | 30.81% | 30.64% | 30.55%  |
| modele        | 100%           | 133.33% | 67.23% | 51.72%    | 80.36%  | 32.71% | 32.65% | 32.61%  |

## Algorithms
1. [u-lzss](https://code.google.com/archive/p/u-lzss/)
2. [lz-string](https://github.com/pieroxy/lz-string)
3. [LZW](https://gist.github.com/revolunet/843889)
4. gzip
5. zlib
6. deflate

## NOTE!
The u-lzss algorithm by Google is buggy! With large strings, the second half of the string becomes malformed. It passes only 2/3 tests. 
