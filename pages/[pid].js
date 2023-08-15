import { Fragment } from 'react'
import fs from 'fs/promises'
import path from 'path'

const ProductDetailPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  return data
}
export const getStaticProps = async (context) => {
  const { params } = context
  const productId = params.pid

  console.log('regenerating ...')
  // const fs = require('fs/promises')
  // const path = require('path')

  const data = await getData()

  const product = data.products.find((x) => x.id === productId)

  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      loadedProduct: product,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await getData()
  // const ids = data.products.map((product) => product.id)
  // const pathsWithParams = ids.map((id) => ({
  //   params: {
  //     pid: `${id}`,
  //   },
  // }))

  const pathsWithParams = data.products.map((product) => ({
    params: { pid: product.id },
  }))
  // console.log('ids: ', ids)
  console.log('params: ', pathsWithParams)
  // return {
  //   paths: [
  //     { params: { pid: 'p1' } },
  //     { params: { pid: 'p2' } },
  //     { params: { pid: 'p3' } },
  //   ],
  //   fallback: true,
  // }
  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

export default ProductDetailPage
