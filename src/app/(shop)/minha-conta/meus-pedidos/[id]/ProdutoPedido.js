import { ChevronDownFilled, ChevronUpFilled } from '@fluentui/react-icons';
import { useState } from 'react';

import styles from './pedido.module.css';

function ProdutoPedido({ produtoPedidoData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { qtd, valor_unitario, valor_subtotal, produto } = produtoPedidoData;

  const nome = produto.data.attributes.titulo;

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.produtoItemContainer}>
      <div className={styles.nomeProdutoContainer}>
        <div className={styles.pedidoTitleContainer}>
          <h1 className={styles.nomeProdutoDesktop}>Nome do Produto</h1>
          <h1 className={styles.nomeProdutoMobile}>{nome}</h1>
          <button onClick={handleToggleExpanded} type="button">
            {isExpanded ? (
              <ChevronUpFilled fontSize={26} />
            ) : (
              <ChevronDownFilled fontSize={26} />
            )}
          </button>
        </div>
        <p className={`${styles.mgTop} ${isExpanded && styles.visible}`}>
          {nome}
        </p>
      </div>
      <div
        className={`${styles.produtoInfoContainer} ${
          isExpanded && styles.visible
        }`}
      >
        <h1>Valor Unitário</h1>
        <p>R$ {valor_unitario.toFixed(2).replace('.', ',')}</p>
      </div>
      <div
        className={`${styles.produtoInfoContainer} ${
          isExpanded && styles.visible
        }`}
      >
        <h1>Quantidade</h1>
        <p>{qtd}</p>
      </div>
      <div
        className={`${styles.produtoInfoContainer} ${
          isExpanded && styles.visible
        }`}
      >
        <h1>Valor Subtotal</h1>
        <p className="pedidoStatus blue">
          R$ {valor_subtotal.toFixed(2).replace('.', ',')}
        </p>
      </div>
    </div>
  );
}

export default ProdutoPedido;
