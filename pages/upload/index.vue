<template>
    <csv-upload/>
</template>

<script>
    import CsvUpload from "../../components/CsvUpload/CsvUpload"

    export default {
        auth: true,
        components: { CsvUpload }
    }
</script>
