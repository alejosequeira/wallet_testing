
import EthAccountsComponent from '@/components/address/EnteredAddress'
import React from 'react'
import style from './second.module.css'

export default function secondMethod() {
  return (
        <div>
          
          <EthAccountsComponent />
          <h1 className={style.title}>Second Method</h1>
        </div>
  )
}
