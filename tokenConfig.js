const tokenConfig = {
  '80001': [
    {
      value: 1,
      name: 'MATIC',
      address: 'null',
      symbol: 'MATIC',
      token_icon: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 2,
      name: 'USD Tether',
      address: '0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832',
      symbol: 'USDT',
      token_icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022',
      decimal: 6,
    },
  ],
  '4': [
    {
      value: 1,
      name: 'ETH',
      address: 'null',
      symbol: 'ETH',
      token_icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
      decimal: 18,
    },
  ],
  '242': [
    {
      value: 1,
      name: 'KAI',
      address: 'null',
      symbol: 'KAI',
      token_icon:
        'https://ipfs.infura.io/ipfs/QmV91sx1aWr2RhzF3LRq5M1qoGvYURaqTtsKjF3kiE88Xw',
      decimal: 18,
    },
  ],
  '137': [
    {
      value: 1,
      name: 'MATIC',
      address: 'null',
      symbol: 'MATIC',
      token_icon: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 2,
      name: 'GrowLimitLess',
      address: '0x42CC424D6a821058C29105f57c409d40991FB316',
      symbol: 'GLL',
      token_icon: 'https://svgshare.com/i/jVw.svg',
      decimal: 18,
    },
    {
      value: 3,
      name: 'USDT',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      token_icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 4,
      name: 'USDC',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      token_icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 5,
      name: 'BNB',
      address: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
      symbol: 'BNB',
      token_icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 6,
      name: 'BUSD',
      address: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
      symbol: 'BUSD',
      token_icon: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022',
      decimal: 18,
    },
    {
      value: 7,
      name: 'UniSwap',
      address: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
      symbol: 'UNI',
      token_icon: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=022',
      decimal: 18,
    },
  ],
  '44787': [
    {
      value: 1,
      name: 'Celo',
      address: 'null',
      symbol: 'celo',
      token_icon: 'https://cryptologos.cc/logos/celo-celo-logo.svg?v=023',
      decimal: 18,
    }
  ],
  '24': [
    {
      value: 1,
      name: 'GrowLimitLess',
      address: '0xE14F49b259863Bc9E3264d1909444EaF82528DcD',
      symbol: 'GLL',
      token_icon: 'https://svgshare.com/i/jVw.svg',
      decimal: 18,
    },
    {
      value: 2,
      name: 'KAI',
      address: 'null',
      symbol: 'KAI',
      token_icon:
        'https://ipfs.infura.io/ipfs/QmV91sx1aWr2RhzF3LRq5M1qoGvYURaqTtsKjF3kiE88Xw',
      decimal: 18,
    },
    {
      value: 3,
      name: 'USD Tether',
      address: '0x551A5dcAC57C66aA010940c2dcFf5DA9c53aa53b',
      symbol: 'USDT',
      token_icon: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022',
      decimal: 6,
    },
    {
      value: 4,
      name: 'KUSD-T',
      address: '0x92364Ec610eFa050D296f1EEB131f2139FB8810e',
      symbol: 'KUSD-T',
      token_icon: 'https://i.im.ge/2022/07/25/FI3qpX.png',
      decimal: 18,
    },
    {
      value: 5,
      name: 'KAIDEX LP Tokens',
      address: '0x1eBbF8080149FF07381AFd148bA0AF007f78cD3c',
      symbol: 'KLP',
      token_icon: 'https://svgshare.com/i/jWH.svg',
      decimal: 18,
    },
  ],
}

const GetTokenByChain = (chain) => tokenConfig[chain]

module.exports = GetTokenByChain
