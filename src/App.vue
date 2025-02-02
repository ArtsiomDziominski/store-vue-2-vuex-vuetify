<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-row>
        <v-col cols="6" class="d-flex justify-center align-center" style="gap: 16px">
          Курс
          <div style="width: 150px">
            <v-text-field
                v-model="storeProduct.exchangeRate"
                type="number"
                outlined
                hide-details
            >
              <template v-slot:prepend>
                ₽
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
          Обновление через: {{ timeInterval }} с.
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import MyRootStore from "@/store";
import {onMounted, ref} from "vue";

export default {
  setup() {
    const storeProduct = MyRootStore.getInstance().product;
    const storeCart = MyRootStore.getInstance().cart;

    const timeInterval = ref(15)

    onMounted(() => {
      storeProduct.fetch();
      setInterval(() => {timeInterval.value--}, 1000);
      setInterval(() => {
        storeProduct.fetch();
        storeCart.updateCart(storeProduct.products);
        timeInterval.value = 15;
      }, timeInterval.value * 1000);

    });

    return {
      storeProduct,
      timeInterval
    };
  }
};
</script>
