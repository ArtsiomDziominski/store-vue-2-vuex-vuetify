<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel
          v-for="(item) in productsList"
          :key="item.group"
      >
        <v-expansion-panel-header>
          {{ item.group }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card v-for="product in item.items" :key="product.name" class="d-flex flex-row align-center ma-4 pa-4">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <p>{{ product.name }} ({{ product.quantity }})</p>
                </v-col>
                <v-col cols="6" class="d-flex justify-end align-center" style="gap: 16px;">
                  <v-chip>
                    {{ formattedCurrency(product.price * exchangeRate) }}
                  </v-chip>
                  <v-btn @click="addToCart(product)">Купить</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import MyRootStore from "@/store";
import {formattedCurrency} from "@/utils/utils";

export default defineComponent({
  setup() {
    const storeProduct = MyRootStore.getInstance().product;
    const storeCart = MyRootStore.getInstance().cart;

    const productsList = computed((): Interfaces.ProductsList[] => storeProduct.productsList);

    const exchangeRate = computed((): number => storeProduct.exchangeRate);

    const addToCart = (product: Interfaces.Cart) => {
      storeCart.addToCart(product);
    }

    return {productsList, exchangeRate, addToCart, formattedCurrency};
  }
});
</script>