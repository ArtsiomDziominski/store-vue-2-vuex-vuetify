<template>
  <v-container>
    <v-card>
      <v-card-title>Корзина</v-card-title>
      <v-list>
        <v-list-item v-for="item in cart" :key="item.T">
          <v-list-item-content>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-chip
                      class="ma-2"
                      color="primary"
                  >
                    {{ item.group }}
                  </v-chip>
                  {{ item.name }}
                </v-col>
                <v-col cols="6" class="d-flex justify-end align-center" style="gap: 16px;">
                  <div style="width: 100px">
                    <v-text-field
                        v-model="item.quantity"
                        type="number"
                        label="Количество"
                        outlined
                        hide-details
                    ></v-text-field>
                  </div>
                  <v-chip
                      :color="priceColors[item.T]"
                  >
                    {{ formattedCurrency(item.C * exchangeRate) }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="removeFromCart(item)" color="red">Удалить</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-text>
        <strong>Общая стоимость: {{ formattedCurrency(totalPrice) }}</strong>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {computed, ref, watch} from 'vue';
import MyRootStore from "@/store";
import {formattedCurrency} from "@/utils/utils";

export default {
  setup() {
    const storeCart = MyRootStore.getInstance().cart;
    const storeProduct = MyRootStore.getInstance().product;

    const priceColors = ref({});
    const previousCarts = ref<Interfaces.Cart[]>([]);
    const previousExchangeRate = ref<number>(0);

    const cart = computed((): Interfaces.Cart[] => storeCart.cart);

    const exchangeRate = computed((): number => storeProduct.exchangeRate)

    const totalPrice = computed((): number => cart.value.reduce((acc, item) => acc + (item.quantity * item.price) * storeProduct.exchangeRate, 0));

    const removeFromCart = (item): void => {
      storeCart.removeFromCart(item);
    }

    watch([cart, exchangeRate], ([newCart, newExchangeRate]) => {
      const colors = {};

      newCart.forEach((item) => {
        const previousPrice = previousCarts.value.find(prev => prev.T === item.T);

        if (previousPrice) {
          if (previousPrice.price * previousExchangeRate.value > item.price * newExchangeRate) {
            colors[item.T] = 'green';
          } else if (previousPrice.price * previousExchangeRate.value < item.price * newExchangeRate) {
            colors[item.T] = 'red';
          }
        } else {
          colors[item.T] = '';
        }
      });

      priceColors.value = colors;
      previousCarts.value = JSON.parse(JSON.stringify(newCart));
      previousExchangeRate.value = newExchangeRate;
    }, { deep: true, immediate: true });


    return {
      cart,
      exchangeRate,
      totalPrice,
      priceColors,
      removeFromCart,
      formattedCurrency
    };
  }
};
</script>