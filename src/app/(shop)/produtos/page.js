import qs from 'qs';
import { notFound } from 'next/navigation';
import styles from './produtos.module.css';
import isNumeric from '../../utils/isNumericString';
import PaginationButtons from '../../components/PaginationButtons/PaginationButtons';
import ListagemProdutos from '../../components/ListagemProdutos/ListagemProdutos';
import HeroProdutos from '../../components/HeroProdutos/HeroProdutos';

async function getProdutos(page = 1) {
  const query = qs.stringify(
    {
      populate: { imagens: { fields: ['url', 'formats'] } },
      fields: [
        'id',
        'titulo',
        'preco_real',
        'preco_original',
        'avaliacao',
        'qtd_avaliacoes',
        'slug',
      ],
      pagination: {
        page,
        pageSize: 10,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const url = `${process.env.STRAPI_API_URL}/produtos?${query}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function TodosProdutos({ searchParams }) {
  let { page } = searchParams;

  if (!isNumeric(page)) {
    page = 1;
  }

  const dataProdutos = await getProdutos(page);

  const { meta } = dataProdutos;

  const currentPage = meta.pagination.page;
  const { pageCount } = meta.pagination;

  if (pageCount > 0 && currentPage > pageCount) {
    notFound();
  }

  const arrayProdutos = dataProdutos.data;

  return (
    <div className={`shopPage ${styles.todosProdutosContainer}`}>
      <HeroProdutos
        title={`Todos os produtos`}
        text="Escolha os produtos desejados"
      />
      {arrayProdutos.length ? (
        <ListagemProdutos arrayProdutos={arrayProdutos} />
      ) : null}
      {!arrayProdutos.length && (
        <h1 className={styles.emptyTitle}>
          Não há nenhum produto nesta categoria...
        </h1>
      )}
      {arrayProdutos.length ? (
        <PaginationButtons currentPage={currentPage} pageCount={pageCount} />
      ) : null}
    </div>
  );
}

export default TodosProdutos;
