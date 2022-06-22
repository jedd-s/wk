export function hash(str) {
  // Matches the wtf/Hasher.h (SuperFastHash) algorithm.

  // Arbitrary start value to avoid mapping all 0's to all 0's.
  const stringHashingStartValue = 0x9e3779b9

  var result = stringHashingStartValue
  var pendingCharacter = null
  for (var i = 0; i < str.length; ++i) {
    var currentCharacter = str[i].charCodeAt(0)
    if (pendingCharacter === null) {
      pendingCharacter = currentCharacter
      continue
    }

    result += pendingCharacter
    result = (result << 16) ^ ((currentCharacter << 11) ^ result)
    result += result >> 11

    pendingCharacter = null
  }

  // Handle the last character in odd length strings.
  if (pendingCharacter !== null) {
    result += pendingCharacter
    result ^= result << 11
    result += result >> 17
  }

  // Force "avalanching" of final 31 bits.
  result ^= result << 3
  result += result >> 5
  result ^= result << 2
  result += result >> 15
  result ^= result << 10

  // Prevent 0 and negative results.
  return (0xffffffff + result + 1).toString(36)
}
