<template>
  <div v-if="pages > 1">
    <div class="row">
      <div class="col-sm-9">
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-sm justify-content-center">
            <li
              class="page-item"
              :class="pagination.page == 1 ? 'disabled' : null"
            >
              <a
                class="page-link"
                href="#"
                tabindex="-1"
                :aria-disabled="pagination.page == 1"
                @click.prevent="pagination.page--"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <!--  -->
            <li
              class="page-item"
              :class="pagination.page == 1 ? 'active' : null"
              :aria-current="pagination.page == 1 ? 'page' : false"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="pagination.page = 1"
              >
                1
              </a>
            </li>

            <!--  -->
            <li v-if="pagination.page > 3" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <!--  -->
            <template v-for="n in pages" :key="n">
              <li
                v-if="n != 1 && n != pages && Math.abs(pagination.page - n) < 3"
                class="page-item"
                :class="pagination.page == n ? 'active' : null"
                :aria-current="pagination.page == n ? 'page' : false"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="pagination.page = n"
                >
                  {{ n }}
                </a>
              </li>
            </template>

            <!--  -->
            <li v-if="pagination.page < pages - 3" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <!--  -->
            <li
              class="page-item"
              :class="pagination.page == pages ? 'active' : null"
              :aria-current="pagination.page == pages ? 'page' : false"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="pagination.page = pages"
              >
                {{ pages }}
              </a>
            </li>

            <!--  -->
            <li
              class="page-item"
              :class="pagination.page == pages ? 'disabled' : null"
            >
              <a
                class="page-link"
                href="#"
                :aria-disabled="pagination.page == pages"
                @click.prevent="pagination.page++"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-sm-3">
        <select
          v-model="pagination.limit"
          class="form-select form-select-sm form-control"
          aria-label="Results per page"
        >
          <option v-for="n in [10, 25, 50]" :key="n" :value="n">
            {{ `${n} results per page` }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { pagination, pages } from '../lib/closures'

export default {
  setup() {
    return { pagination, pages }
  },
}
</script>
