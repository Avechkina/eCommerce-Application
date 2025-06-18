import { useNavigate, useParams } from 'react-router';
import classes from './ProductCard.module.css';
import { LocalizedString } from '@commercetools/platform-sdk';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getOrCreateCart from '@utils/getOrCreateCart';
import useCartStore from '@store/cartStore';
import addProductToCart from '@utils/addProductToCart';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';
import { MouseEvent } from 'react';

export type TProductCardProps = {
  id?: string;
  image: string;
  name: string;
  price: number;
  discont?: number;
  slug: LocalizedString;
  description?: string;
};

const ProductCard = (props: TProductCardProps) => {
  const { id, image, name, price, discont, description, slug } = props;
  const navigate = useNavigate();
  const { categoryName, subcategoryName } = useParams();
  const { cartDetails, setDetails, items, setItems } = useCartStore(
    (state) => state
  );

  const handleClick = () => {
    let productUrl = '';

    if (categoryName && subcategoryName) {
      productUrl = `/catalog/${categoryName}/${subcategoryName}/product/${slug['en-US']}`;
    } else if (categoryName) {
      productUrl = `/catalog/${categoryName}/product/${slug['en-US']}`;
    } else {
      productUrl = `/catalog/product/${slug['en-US']}`;
    }

    navigate(productUrl, { state: id });
  };

  const addToCart = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!id) return;
    try {
      const cart = await getOrCreateCart(cartDetails.id);
      setDetails({ id: cart.id, version: cart.version });
      const response = await addProductToCart(cart.id, cart.version, id, 1);
      message.success({
        content: `${name} added to Cart!`,
        duration: 1,
      });
      const items = formatCartItems(response.body.lineItems);
      const totalPrice = response.body.totalPrice;
      const subtotal = formatPrice(
        totalPrice.centAmount,
        totalPrice.currencyCode
      );
      setItems(items, subtotal);
    } catch (error) {
      message.error({
        content: `Failed to add ${name} to Cart`,
        duration: 1,
      });
      console.error(error);
    }
  };

  return (
    <div className={classes.product_card} onClick={handleClick}>
      <div className={classes.product_card_image}>
        <img src={image} alt={`${name} image`} />
      </div>
      <div className={classes.product_card_info}>
        <div className={classes.product_card_title}>{name}</div>
        <div className={classes.product_card_description}>{description}</div>
        <div className={classes.product_card_price_container}>
          {discont && <span className={classes.discont_price}>${discont}</span>}
          <span
            className={`${classes.regular_price} ${discont && classes.line_through}`}
          >
            ${price}
          </span>
        </div>
      </div>
      <Button
        style={{ maxWidth: 'fit-content', margin: '8px auto' }}
        icon={<PlusOutlined />}
        onClick={addToCart}
        disabled={Boolean(items?.find((item) => item.product.productId === id))}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
