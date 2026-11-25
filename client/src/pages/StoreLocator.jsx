import { useMemo, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Store } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import { FormSelect } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { SAMPLE_STORES } from '../data/siteData.js';

export default function StoreLocator() {
  const [country, setCountry] = useState('India');
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  const countries = useMemo(
    () => Array.from(new Set(SAMPLE_STORES.map((s) => s.country))),
    []
  );

  const states = useMemo(
    () =>
      Array.from(
        new Set(
          SAMPLE_STORES.filter((s) => !country || s.country === country).map(
            (s) => s.state
          )
        )
      ),
    [country]
  );

  const districts = useMemo(
    () =>
      Array.from(
        new Set(
          SAMPLE_STORES.filter(
            (s) =>
              (!country || s.country === country) &&
              (!stateFilter || s.state === stateFilter)
          ).map((s) => s.district)
        )
      ),
    [country, stateFilter]
  );

  const filteredStores = useMemo(
    () =>
      SAMPLE_STORES.filter(
        (s) =>
          (!country || s.country === country) &&
          (!stateFilter || s.state === stateFilter) &&
          (!districtFilter || s.district === districtFilter)
      ),
    [country, stateFilter, districtFilter]
  );

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Outlet Tour"
        title="Find a Gramiyam Store"
        subtitle="Explore our retail outlets by country, state, and district. Verified store addresses and map coordinates will update as outlets are confirmed."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam">
          {/* Filter Bar */}
          <div className="mb-10 grid grid-cols-1 gap-4 rounded-sm border border-softgrey bg-white p-6 shadow-card md:grid-cols-4 md:items-end">
            <FormSelect
              label="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setStateFilter('');
                setDistrictFilter('');
              }}
              options={countries}
              placeholder="All Countries"
            />
            <FormSelect
              label="State"
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setDistrictFilter('');
              }}
              options={states}
              placeholder="All States"
            />
            <FormSelect
              label="District"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              options={districts}
              placeholder="All Districts"
            />
            <button
              type="button"
              onClick={() => {
                setCountry('India');
                setStateFilter('');
                setDistrictFilter('');
              }}
              className="h-[46px] rounded-sm border border-forest px-5 text-xs font-semibold uppercase tracking-wider text-forest transition hover:bg-forest hover:text-ivory"
            >
              Reset Selection
            </button>
          </div>

          {filteredStores.length === 0 ? (
            <EmptyState
              icon={Store}
              title="No stores found in this selection"
              description="We are expanding across districts. Try clearing your filters or apply for a Gramiyam franchise in your area."
              actionLabel="Apply for Franchise"
              actionTo="/franchise"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredStores.map((store) => (
                <article
                  key={store.id}
                  className="flex flex-col justify-between rounded-sm border border-softgrey bg-white p-6 shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                        {store.district}, {store.state}
                      </span>
                      {store.isPlaceholder && (
                        <span className="rounded-sm bg-cream px-2 py-0.5 text-[10px] font-medium text-charcoal/70">
                          Awaiting Address Verification
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 font-serif text-2xl font-medium text-forest">
                      {store.name}
                    </h2>

                    <div className="mt-4 space-y-2.5 text-sm text-charcoal/80">
                      <p className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
                        <span>{store.address}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 shrink-0 text-botanical" />
                        <span>{store.phone}</span>
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 shrink-0 text-botanical" />
                        <span>{store.hours}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-softgrey pt-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        store.mapQuery
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
                    >
                      Get Directions
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Coming Soon & Franchise CTA */}
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-sm border border-softgrey bg-cream/70 p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Expanding Footprint
              </p>
              <h3 className="mt-2 font-serif text-3xl font-medium text-forest">
                Coming Soon Near You
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                New Gramiyam herbal outlets are planned across Tamil Nadu and neighbouring states. Verified opening dates and addresses will be published here.
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-sm bg-forest p-8 text-ivory">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Franchise Opportunity
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-ivory">
                  Open a Gramiyam Outlet in Your District
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/80">
                  Partner with Gramiyam to bring authentic Siddha and Ayurveda formulations to your local community.
                </p>
              </div>
              <div className="mt-6">
                <PrimaryButton to="/franchise" variant="ivory">
                  Apply for Franchise
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
