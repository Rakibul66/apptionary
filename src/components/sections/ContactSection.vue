<!-- src/components/sections/ContactSection.vue -->
<script setup>
import { reactive, ref } from 'vue'

/* --- Config --- */
const FORM_ENDPOINT = '' // e.g. 'https://formspree.io/f/abcdwxyz'
import ILLUSTRATION from '../../assets/vue.svg'

/* Quick contact strip */
const WHATSAPP_NUMBER = '+8801784067744'
const QUICK_EMAIL = 'roxyhasan76@gmail.com'
const waLink = (n) => 'https://wa.me/' + (n || '').replace(/\D/g, '')

/* Country codes (kept minimal) */
const countries = [
  { c: 'BD', label: '🇧🇩 +880', dial: '+880' },
  { c: 'US', label: '🇺🇸 +1',   dial: '+1'   },
  { c: 'GB', label: '🇬🇧 +44',  dial: '+44'  },
  { c: 'IN', label: '🇮🇳 +91',  dial: '+91'  },
  { c: 'PK', label: '🇵🇰 +92',  dial: '+92'  },
  { c: 'SA', label: '🇸🇦 +966', dial: '+966' },
]

/* Form state */
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryDial: countries[0].dial,
  phone: '',
  message: '',
  agree: true,
})
const sending = ref(false)
const done = ref(false)
const errors = reactive({})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.firstName.trim()) errors.firstName = 'First name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Please add a short message'
  if (!form.agree) errors.agree = 'Please agree to the privacy policy'
  return Object.keys(errors).length === 0
}

async function onSubmit() {
  if (!validate()) return
  sending.value = true
  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      done.value = true
    } else {
      const subject = encodeURIComponent('Let’s talk')
      const body = encodeURIComponent(
`First Name: ${form.firstName}
Last Name: ${form.lastName}
Email: ${form.email}
Phone: ${form.countryDial} ${form.phone}

Message:
${form.message}`
      )
      window.location.href = `mailto:${QUICK_EMAIL}?subject=${subject}&body=${body}`
      done.value = true
    }
    form.firstName = ''; form.lastName = ''; form.message = ''
  } catch {
    errors.form = 'Could not send message. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="bg-white py-16 md:py-24">
    <div class="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
      <!-- Illustration -->
      <div class="order-2 lg:order-1">
        <img :src="ILLUSTRATION" alt="Let’s talk" class="w-full h-auto select-none" loading="lazy" />
      </div>

      <!-- Card -->
      <div class="order-1 lg:order-2">
        <div class="rounded-2xl border border-teal-200/70 bg-teal-50/70 shadow-sm p-6 md:p-8">
          <h3 class="text-2xl md:text-[28px] font-extrabold text-gray-800">
            Let’s Talk – It’s Free
          </h3>
          <p class="mt-2 text-gray-600">
            Whether you have a clear idea or just some questions, we’re here to help. Grab a free
            session—no commitments, just honest advice tailored to your goals.
          </p>

          <!-- Quick contact strip (one row with divider) -->
          <div class="mt-4 rounded-xl border border-teal-200 bg-white overflow-hidden">
            <div class="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-teal-200">
              <!-- WhatsApp -->
              <a :href="waLink(WHATSAPP_NUMBER)" target="_blank" rel="noopener"
                 class="flex-1 flex items-center gap-3 p-3 sm:p-4 hover:bg-teal-50 transition">
                <!-- WA icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 text-emerald-600">
                  <path fill="currentColor" d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0 12 12 0 0 0 2.2 17.4L0 24l6.77-2.17A12 12 0 0 0 24 12a11.9 11.9 0 0 0-3.48-8.52ZM12 21.33a9.25 9.25 0 0 1-4.73-1.3l-.34-.2-4.02 1.29 1.32-3.88-.22-.36A9.34 9.34 0 1 1 21.33 12 9.33 9.33 0 0 1 12 21.33Zm5.34-7.08c-.3-.15-1.78-.88-2.06-.98s-.48-.15-.68.15-.78.98-.96 1.18-.36.22-.66.07a7.65 7.65 0 0 1-2.25-1.39 8.43 8.43 0 0 1-1.56-1.93c-.16-.3 0-.46.14-.61l.42-.48c.15-.15.22-.26.33-.44a.56.56 0 0 0 0-.53c-.07-.15-.62-1.64-.85-2.25s-.45-.52-.63-.53h-.54a1 1 0 0 0-.75.35 3.17 3.17 0 0 0-1 2.35 5.5 5.5 0 0 0 1.15 2.94 12.55 12.55 0 0 0 4.83 4.6 16.54 16.54 0 0 0 1.61.74 3.87 3.87 0 0 0 1.78.11 2.9 2.9 0 0 0 1.92-1.34 2.36 2.36 0 0 0 .16-1.34c-.07-.11-.26-.18-.56-.33Z"/>
                </svg>
                <span class="text-sm text-gray-600"></span>
                <span class="font-semibold text-gray-800 truncate">+8801784067744</span>
              </a>
              <!-- Email -->
              <a :href="`mailto:${QUICK_EMAIL}`"
                 class="flex-1 flex items-center gap-3 p-3 sm:p-4 hover:bg-teal-50 transition">
                <!-- Mail icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 text-teal-600">
                  <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v1.2l10 5.8 10-5.8V6a2 2 0 0 0-2-2Zm0 6.4-9.4 5.44a1 1 0 0 1-1.2 0L0 10.4V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6Z"/>
                </svg>
                <span class="text-sm text-gray-600"></span>
                <span class="font-semibold text-gray-800 truncate">roxyhasan76@gmail.com</span>
              </a>
            </div>
          </div>

          <!-- Form -->
          <form class="mt-6 space-y-6" novalidate @submit.prevent="onSubmit">
            <!-- Row 1 -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name<span class="text-rose-500">*</span></label>
                <input v-model="form.firstName" type="text"
                       class="mt-1 w-full rounded-lg border border-teal-200 bg-white px-4 py-3 text-gray-900
                              outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                       placeholder="Enter first name" />
                <p v-if="errors.firstName" class="mt-1 text-xs text-rose-500">{{ errors.firstName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input v-model="form.lastName" type="text"
                       class="mt-1 w-full rounded-lg border border-teal-200 bg-white px-4 py-3 text-gray-900
                              outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                       placeholder="Enter last name" />
              </div>
            </div>

            <!-- Row 2 -->
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Email<span class="text-rose-500">*</span></label>
                <input v-model="form.email" type="email"
                       class="mt-1 w-full rounded-lg border border-teal-200 bg-white px-4 py-3 text-gray-900
                              outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                       placeholder="Enter your email" />
                <p v-if="errors.email" class="mt-1 text-xs text-rose-500">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Mobile Number / WhatsApp</label>
                <div class="mt-1 flex gap-2">
                  <select v-model="form.countryDial"
                          class="w-28 rounded-lg border border-teal-200 bg-white px-2 py-3 text-gray-900
                                 outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400">
                    <option v-for="ct in countries" :key="ct.c" :value="ct.dial">{{ ct.label }}</option>
                  </select>
                  <input v-model="form.phone" type="tel" inputmode="tel"
                         class="flex-1 rounded-lg border border-teal-200 bg-white px-4 py-3 text-gray-900
                                outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                         placeholder="123 456 7890" />
                </div>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Message<span class="text-rose-500">*</span></label>
              <textarea v-model="form.message" rows="5"
                        class="mt-1 w-full rounded-lg border border-teal-200 bg-white px-4 py-3 text-gray-900
                               outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                        placeholder="Specify your requirements" />
              <p v-if="errors.message" class="mt-1 text-xs text-rose-500">{{ errors.message }}</p>
            </div>

            <!-- Consent -->
            <div class="flex items-start gap-2">
              <input id="agree" type="checkbox" v-model="form.agree"
                     class="mt-1 h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500" />
              <label for="agree" class="text-sm text-gray-600">
                I agree to the <a href="#" class="text-teal-600 hover:underline">privacy policy</a>
                and consent to be contacted via email or WhatsApp.
              </label>
            </div>
            <p v-if="errors.agree" class="text-xs text-rose-500 -mt-2">{{ errors.agree }}</p>
            <p v-if="errors.form" class="text-sm text-rose-500">{{ errors.form }}</p>

            <!-- Button -->
            <div>
              <button type="submit" :disabled="sending"
                      class="inline-flex items-center justify-center rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white
                             shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                             disabled:opacity-60">
                <span v-if="!sending && !done">Send Message</span>
                <span v-else-if="sending">Sending…</span>
                <span v-else>Sent ✓</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
