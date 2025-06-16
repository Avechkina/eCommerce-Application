import {
  Button,
  Carousel,
  Flex,
  Image,
  message,
  Space,
  Spin,
  Typography,
} from 'antd';
import getProduct from '@utils/getProduct';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router';
import {
  DeleteOutlined,
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import getOrCreateCart from '@utils/getOrCreateCart';
import addProductToCart from '@utils/addProductToCart';
import ProductViewNumberInput from '@components/ProductViewNumberInput/ProductViewNumberInput';
import useCartStore from '@store/cartStore';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';
import removeProductFromCart from '@utils/removeProductFromCart';
import ProductAttribute from '@components/ProductAttribute/ProductAttribute';

const { Title, Text } = Typography;

const ProductView = () => {
  const location = useLocation();
  const productId = location.state;
  const [product, setProduct] = useState<ProductProjection>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { cartDetails, setDetails, items, setItems, setOriginalPrice } =
    useCartStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) {
        setError('Product ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getProduct(productId);
        setProduct(response.body);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 84 }} spin />}
        fullscreen
      />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product?.masterVariant.images?.length) {
    return <div>No product images available</div>;
  }

  const getProductPrice = () => {
    const prices = product.masterVariant.prices;
    if (prices && prices.length > 0) {
      const price = prices[0];
      const value = price.value.centAmount;
      const currency = price.value.currencyCode;

      const formattedPrice = `${(value / 100).toFixed(2)} ${currency}`;

      if (price.discounted) {
        const discountedValue = price.discounted.value.centAmount;
        const discountedCurrency = price.discounted.value.currencyCode;

        const discountedPrice = `${(discountedValue / 100).toFixed(2)} ${discountedCurrency}`;

        return {
          formattedPrice,
          discountedPrice,
        };
      }

      return {
        formattedPrice,
      };
    }
    return null;
  };

  const price = getProductPrice();

  const addToCart = async () => {
    try {
      const cart = await getOrCreateCart(cartDetails.id);
      setDetails({ id: cart.id, version: cart.version });
      const response = await addProductToCart(
        cart.id,
        cart.version,
        productId,
        quantity
      );
      message.success({
        content: `${product.name['en-US']} added to Cart!`,
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
        content: `Failed to add ${product.name['en-US']} to Cart`,
        duration: 1,
      });
      console.error(error);
    }
  };

  const removeProduct = async () => {
    if (!items) return;
    const id = items.find((item) => item.product.productId === productId)
      ?.product.id;
    if (!id) return;
    try {
      const response = await removeProductFromCart(
        cartDetails.id,
        cartDetails.version,
        id
      );
      const items = formatCartItems(response.body.lineItems);
      const totalPrice = response.body.totalPrice;
      const subtotal = formatPrice(
        totalPrice.centAmount,
        totalPrice.currencyCode
      );
      setItems(items, subtotal);
      message.success({
        content: `${product.name['en-US']} removed from Cart!`,
        duration: 1,
      });

      const discount =
        response.body.discountOnTotalPrice?.discountedAmount.centAmount;
      if (discount) {
        const originalPrice = formatPrice(
          totalPrice.centAmount + discount,
          totalPrice.currencyCode
        );
        setOriginalPrice(originalPrice);
      }
    } catch (error) {
      message.error({
        content: `Failed to remove ${product.name['en-US']} from Cart`,
        duration: 1,
      });
      console.error(error);
    }
  };

  const changeQuantity = (value: number | null) => {
    if (value === null) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <Flex
      style={{ width: '80%', margin: '0 auto' }}
      gap="middle"
      wrap
      justify="space-between"
      align="center"
    >
      <div style={{ maxWidth: 400, width: '100%' }}>
        <Image.PreviewGroup
          preview={{
            toolbarRender: (
              _,
              { actions: { onActive, onZoomOut, onZoomIn } }
            ) => (
              <Space size={12} className="toolbar-wrapper">
                <div onClick={() => onActive?.(-1)}>
                  <LeftOutlined style={{ fontSize: '16px' }} />
                </div>
                <div onClick={() => onActive?.(1)}>
                  <RightOutlined style={{ fontSize: '16px' }} />
                </div>
                <div onClick={onZoomOut}>
                  <ZoomOutOutlined style={{ fontSize: '16px' }} />
                </div>
                <div onClick={onZoomIn}>
                  <ZoomInOutlined style={{ fontSize: '16px' }} />
                </div>
              </Space>
            ),
          }}
        >
          <Carousel autoplay arrows fade>
            {product.masterVariant.images.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                width="100%"
                alt={`Product image ${index + 1}`}
              />
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
      <div>
        <Title level={2}>{product.name['en-US'] || 'No Name'}</Title>
        <Text type="secondary">
          {product.description
            ? product.description['en-US']
            : 'No description'}
        </Text>
        <Title level={4}>
          {price?.discountedPrice
            ? price.discountedPrice
            : price?.formattedPrice}
        </Title>
        <Text delete>
          {price?.discountedPrice ? price?.formattedPrice : undefined}
        </Text>
        <Flex gap="small" justify="center" style={{ marginTop: 10 }}>
          {items &&
          Boolean(
            items.find((item) => item.product.productId === productId)
          ) ? (
            <Button
              onClick={removeProduct}
              type="text"
              icon={<DeleteOutlined />}
            >
              Remove from Cart
            </Button>
          ) : (
            <>
              <ProductViewNumberInput
                value={quantity}
                onChange={changeQuantity}
              />
              <Button onClick={addToCart}>Add to Cart</Button>
            </>
          )}
        </Flex>
      </div>
      <Flex vertical gap="small" style={{ width: '100%' }}>
        {product.masterVariant.attributes?.map((attribute) => (
          <ProductAttribute key={attribute.name} attribute={attribute} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductView;
