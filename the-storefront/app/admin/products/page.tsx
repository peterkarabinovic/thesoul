import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

import { gql } from "urql/core" 
import { graphql } from "../graphql-client"

export default async function Products() {

    const { data, error} = await graphql.query(gql`{
        products {
            nodes {
                productId
                title
                updatedAt
                images
                handle
                subtitle
            }
        }
    }`,{}).toPromise();

  return (
    <div className="container">
        <div className="flex gap-4 items-center justify-between">
            <h4>Товар</h4>
            <Link 
                href='/admin/newproduct'
                className='flex gap-2 items-center text-sm my-secondary-button'
                >
                    <PlusIcon className='w-5 h-5'/>
                    Додати товар
            </Link>    
        </div>
      <div className="mt-4 w-full">
        <div className="relative overflow-x-auto">
            <table className="cart-table w-full text-sm text-left">
            <thead className="text-md bg-[#f4f5f7]">
                <tr>
                    <th scope="col" className="py-3 pl-3">ID</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Підзаголовок</th>
                    <th scope="col">Оновлено</th>
                </tr>
            </thead>
            <tbody>
                {data?.products.nodes.map((product: any) => (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.title}</td>
                        <td>{product.subtitle}</td>
                        <td>{product.updatedAt}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}