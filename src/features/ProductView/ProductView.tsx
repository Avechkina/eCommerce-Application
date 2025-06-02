import { Carousel, Image, Space, Typography } from 'antd';
import getProduct from '@utils/getProduct';
import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router';
import {
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductView = () => {
  const location = useLocation();
  const productId = location.state;
  const [product, setProduct] = useState<ProductProjection>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
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

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 400, width: '100%', margin: 'auto' }}>
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
        <Title level={4}>{price?.discountedPrice}</Title>
        <Text delete>{price?.formattedPrice}</Text>
      </div>
    </div>
  );
};

export default ProductView;
