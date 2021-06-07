<template>
  <v-form ref="form" class="demo-form mt-4" v-model="valid" lazy-validation>
    <v-container class="mt-6 mb-14 d-flex pa-2 flex-column">
      <v-text-field
        label="Contract Account Id"
        v-model="contractName"
        required
        :rules="contractNameRules"
      ></v-text-field>
  
      <v-text-field
        label="Your Account Id"
        v-model="senderName"
        required
        :rules="senderNameRules"
      ></v-text-field>
  
      <v-text-field
        v-model="message"
        label="Message"
        clearable
        required
        :rules="messageRules"
      ></v-text-field>

      <v-slider
        class="mt-8"
        v-model="donation"
        max="5"
        min="0"
        label="Donation"
        :track-color="'blue'"
        thumb-label="always"
      ></v-slider>
  
      <div>
        <v-btn
        class="me-2"
          elevation="2"
          @click="submitForm"
        >Send Thank You Message</v-btn>
        <v-btn
          elevation="2"
          @click="clear"
        >Clear</v-btn>
      </div>
    </v-container>
  </v-form>
</template>



<script>
  export default {
    data: () => ({
      valid: true,
      contractName: '',
      contractNameRules: [
        v => !!v || 'Contract Name is required',
      ],
      senderName: '',
      senderNameRules: [
        v => !!v || 'Sender Name is required',
      ],
      message: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 100) || 'Message must be fewer than 100 characters'
      ],
      donation: 0,
    }),
    computed: {
      rules() {

      }
    },
    methods: {
      clear () {
        this.$refs.form.reset()
      },
      submitForm () {
        this.$refs.form.validate()
        const isValid = this.$refs.form.validate()
        if (isValid) console.log(isValid)

      },
    }
  }

</script>
