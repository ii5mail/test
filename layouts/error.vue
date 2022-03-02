<template>
<div>
    <div  class="d-flex flex-column fill-height">
        <div class="white fill-height primary-text--text d-flex flex-row flex-wrap justify-center align-center">
            <div class="error-text pa-16">
                <div class="pa-12">
                    <h1 v-if="error.statusCode === 404" class="mb-6">
                        404 
                    </h1>
                    <h1 v-else-if="error.statusCode === 403" class="mb-6">
                        403
                    </h1>
                    <h1 v-else class="mb-6">
                        An Error Occurred
                    </h1>
                    <p v-if="error.statusCode === 403" class="font-18 primary-text--text text--lighten-2 light-weight mb-12">Sorry,   you are not alllowed to access this website</p>
                    <p v-else-if="error.statusCode === 404" class="font-18 primary-text--text text--lighten-2 light-weight mb-12">Sorry, the page you are looking for doesn't exist or has been moved. Here are some helpful links:</p>
                    <p v-else class="font-18 primary-text--text text--lighten-2 light-weight mb-12">Sorry, there is an error on this page:</p>
                   
                    <v-btn
                        class="mr-3"
                        color="primary-text"
                        outlined
                        large
                        depressed
                        @click="$router.go(-1)"
                    >
                        <span><img src="@/assets/images/icons/left_arrow.png" class="mr-2 mt-1"/></span>Go Back
                    </v-btn>
                    <v-btn
                        class=""
                        color="primary"
                        large
                        depressed
                        to="/"
                    >
                        Take Me Home
                    </v-btn>
            
                </div>
            </div>
            <div v-if="error.statusCode === 403" class="error-text d-flex">
                <img class="fill-width" src="@/assets/images/stock/resticted.png" alt="restricted image"/>
            </div>
            <div v-else class="error-text d-flex">
                <img class="fill-width" src="@/assets/images/stock/stock_error_detour.png" alt="construction detour sign"/>
            </div>
        </div>
        <home-footer/>
    </div>
      
    </div>
</template>

<script>
    import HomeFooter from '../components/footer/FooterHome'

    export default {
        layout: 'empty',
        components: { HomeFooter },
        props: {
            error: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
            }
        },
        head() {
            const title =
                this.error.statusCode === 404 || this.error.statusCode === 403 ? this.pageNotFound : this.otherError
            return {
                title
            }
        }
    }
</script>

<style scoped lang="stylus">

    h1
        font-size 60px

    .error-text
        flex 1 1 480px


</style>
