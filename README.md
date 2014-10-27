# Stellar federation servers

A federation server allows Stellar clients to look up `username@example.com`
which can then resolve to a Stellar address.

At the minimum, a federation server must serve the federation api and
the [stellar.txt](https://github.com/stellar/docs/blob/master/docs/Stellar.txt.md)
file (which lets users know where the api is located).

This repository contains a collection of example federation servers.

These are the implementations in this repository:
- [Node.js and express](node)
