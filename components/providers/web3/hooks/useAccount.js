

import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0xac2a4f75c04d67f5c3630014020a9f79353ec753bc66e61f39d81f5ca879c03f": true,
  "0x5d048a4758f3b7198012634f60c85dd27b2132d93514e3db99ec8a3bb1ffa7e7": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)

    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
  }, [provider])

  return {
    data,
    isAdmin: (
      data &&
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}


/// 0x3c27476c18e88b4844a0ec924cdfc3b8510158e4caa700cc51c159f1f5cf7b3e
