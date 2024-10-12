import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import DetailProductView from '@/views/DetailProductView.vue';
import router from '@/router';  // Asegúrate de exportar el router en tu archivo de configuración

describe('Vue Router', () => {
  it('should navigate to HomeView', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('Productos Destacados');
  });

  it('should navigate to DetailProductView with correct title', async () => {
    const productId = 'ff25843b-56e9-460d-ba48-05906759e392';
    router.push(`/product/${productId}`);
    await router.isReady();

    const wrapper = mount(DetailProductView, {
      global: {
        plugins: [router],
      },
    });

    // Simula la carga del producto
    wrapper.vm.$store.state.products = [
      {
        id: productId,
        nombre: 'Cafetera',
        imagen: '/imgs/img1.webp',
        categoria: 'cocina',
        descripcion: 'Cafetera de acero inoxidable',
        precio: 10000,
        descuento: 850,
        stock: 15,
      }
    ];

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Cafetera');
    expect(document.title).toBe('Cafetera');
  });
});
