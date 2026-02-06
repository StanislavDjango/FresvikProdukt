import { useQuery } from '@tanstack/react-query'
import api from './client'
import type { paths } from './types'

type ProductListResponse =
  paths['/api/v1/products/']['get']['responses']['200']['content']['application/json']
type ProductDetailResponse =
  paths['/api/v1/products/{slug}/']['get']['responses']['200']['content']['application/json']

export const fetchProducts = async (): Promise<ProductListResponse> => {
  const { data } = await api.get<ProductListResponse>('/products/')
  return data
}

export const fetchProduct = async (slug: string): Promise<ProductDetailResponse> => {
  const { data } = await api.get<ProductDetailResponse>(`/products/${slug}/`)
  return data
}

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: () => fetchProduct(slug),
    enabled: Boolean(slug),
  })
