import heapq
from collections import defaultdict, Counter

class HuffmanNode:
    def __init__(self, char=None, freq=0, left=None, right=None):
        self.char = char
        self.freq = freq
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text):
    freq = Counter(text)
    heap = [HuffmanNode(char, freq) for char, freq in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = HuffmanNode(None, left.freq + right.freq, left, right)
        heapq.heappush(heap, merged)
    return heap[0] if heap else None

def build_codes(node, prefix="", codebook=None):
    if codebook is None:
        codebook = {}
    if node is not None:
        if node.char is not None:
            codebook[node.char] = prefix
        build_codes(node.left, prefix + "0", codebook)
        build_codes(node.right, prefix + "1", codebook)
    return codebook

def compress(text):
    if not text:
        return "", None, {}
    root = build_huffman_tree(text)
    codebook = build_codes(root)
    compressed = ''.join(codebook[char] for char in text)
    return compressed, root, codebook

def decompress(binary, codebook):
    if not binary or not codebook:
        return ""
    inv_codebook = {v: k for k, v in codebook.items()}
    decoded = ""
    current = ""
    for bit in binary:
        current += bit
        if current in inv_codebook:
            decoded += inv_codebook[current]
            current = ""
    return decoded

def tree_to_dict(node):
    if node is None:
        return None
    if node.char is not None:
        return {"char": node.char, "freq": node.freq}
    return {
        "freq": node.freq,
        "left": tree_to_dict(node.left),
        "right": tree_to_dict(node.right)
    }