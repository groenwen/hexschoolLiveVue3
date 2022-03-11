<template>
  <div>
    <header class="mt-5">
      <h1>Front</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <!-- <router-link to="/about">About</router-link> -->
        <router-link to="/products">產品列表</router-link> |
        <router-link to="/cart"><i class="bi bi-cart-fill"></i> 購物車</router-link> |
        <router-link to="/admin"> 後台</router-link>
      </nav>
    </header>
    <router-view/>
  </div>
</template>
