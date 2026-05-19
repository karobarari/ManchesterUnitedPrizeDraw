import { useState } from 'react'
import { getNames } from 'country-list'



const countries = getNames().sort()

interface ProfileForm {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2: string
  city: string
  country: string
  stateProvince: string
  zipCode: string
  marketingOptIn: boolean
}

export default function Profile() {
  const [form, setForm] = useState<ProfileForm>({
    firstName:      '',
    lastName:       '',
    addressLine1:   '',
    addressLine2:   '',
    city:           '',
    country:        'United Kingdom',
    stateProvince:  '',
    zipCode:        '',
    marketingOptIn: true,
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement
    setForm(prev => ({
      ...prev,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    }))
    setSaved(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to API in step 5
    await new Promise(r => setTimeout(r, 600))
    setSaved(true)
  }

  return (
    <div className="max-w-2xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-utd-red text-xs uppercase tracking-widest mb-1">My account</p>
        <h1 className="text-2xl font-medium text-gray-900">
          Welcome, {form.firstName || 'there'}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Keep your details up to date so we can contact you if you win.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* First + Last name row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Marcus"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Rashford"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
            />
          </div>
        </div>

        {/* Address line 1 */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="Old Trafford, Sir Matt Busby Way"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
          />
        </div>

        {/* Address line 2 */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Address Line 2 <span className="text-gray-300 normal-case">(optional)</span>
          </label>
          <input
            type="text"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            placeholder=""
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
          />
        </div>

        {/* City + Zip row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              City
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Manchester"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              Zip / Postal Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              placeholder="M16 0RA"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition bg-white"
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State / Province */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
            State / Province
          </label>
          <input
            type="text"
            name="stateProvince"
            value={form.stateProvince}
            onChange={handleChange}
            placeholder="Greater Manchester"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-utd-red transition"
          />
        </div>

        {/* Marketing opt-in */}
        <div className="flex items-start gap-3 border border-gray-100 rounded-lg p-4 bg-gray-50">
          <input
            type="checkbox"
            name="marketingOptIn"
            id="marketingOptIn"
            checked={form.marketingOptIn}
            onChange={handleChange}
            className="mt-0.5 accent-utd-red"
          />
          <label htmlFor="marketingOptIn" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
            I agree to receive future marketing communications, promotions for other prize draws,
            or have my information shared with the current host and associated charitable causes.
            To opt out, please untick this box.
          </label>
        </div>

        {/* Save button + confirmation */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="bg-utd-red text-white text-sm font-medium px-8 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Save Profile
          </button>
          {saved && (
            <span className="text-green-600 text-sm">
              ✓ Profile saved
            </span>
          )}
        </div>

      </form>
    </div>
  )
}