import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is super_admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!roleData || roleData.role !== 'super_admin') {
      throw new Error('Only super_admin can seed test data');
    }

    console.log('Starting test data seeding...');

    // 1. Create Commerciale user
    const { data: commercialeUser, error: commercialeError } = await supabase.auth.admin.createUser({
      email: 'commerciale.test@example.com',
      password: 'TestCommerciale123!',
      email_confirm: true,
      user_metadata: {
        display_name: 'Mario Rossi (Test Commerciale)'
      }
    });

    if (commercialeError) {
      console.error('Error creating commerciale:', commercialeError);
      throw commercialeError;
    }

    console.log('Created commerciale user:', commercialeUser.user.id);

    // Assign commerciale role
    await supabase.from('user_roles').insert({
      user_id: commercialeUser.user.id,
      role: 'commerciale'
    });

    console.log('Assigned commerciale role');

    // 2. Create Rivenditore user
    const { data: rivenditoreUser, error: rivenditoreError } = await supabase.auth.admin.createUser({
      email: 'rivenditore.test@example.com',
      password: 'TestRivenditore123!',
      email_confirm: true,
      user_metadata: {
        display_name: 'Luca Bianchi (Test Rivenditore)'
      }
    });

    if (rivenditoreError) {
      console.error('Error creating rivenditore:', rivenditoreError);
      throw rivenditoreError;
    }

    console.log('Created rivenditore user:', rivenditoreUser.user.id);

    // Assign rivenditore role
    await supabase.from('user_roles').insert({
      user_id: rivenditoreUser.user.id,
      role: 'rivenditore'
    });

    console.log('Assigned rivenditore role');

    // 3. Create dealers for commerciale
    const dealersData = [
      {
        ragione_sociale: 'Serramenti Italia Srl',
        p_iva: '12345678901',
        codice_fiscale: '12345678901',
        email: 'info@serramenti-italia.it',
        telefono: '+39 02 1234567',
        indirizzo: 'Via Roma 123',
        cap: '20100',
        citta: 'Milano',
        provincia: 'MI',
        commerciale_owner_id: commercialeUser.user.id,
        note: 'Cliente storico, specializzato in finestre PVC'
      },
      {
        ragione_sociale: 'Infissi Moderni',
        p_iva: '98765432109',
        codice_fiscale: '98765432109',
        email: 'contatti@infissimoderni.it',
        telefono: '+39 02 7654321',
        indirizzo: 'Corso Italia 45',
        cap: '20100',
        citta: 'Milano',
        provincia: 'MI',
        commerciale_owner_id: commercialeUser.user.id,
        commissione_personalizzata: 3.5,
        note: 'Focus su serramenti in alluminio'
      },
      {
        ragione_sociale: 'Porte e Finestre Plus',
        p_iva: '11223344556',
        codice_fiscale: '11223344556',
        email: 'info@porteefinestre.it',
        telefono: '+39 06 1112233',
        indirizzo: 'Via Nazionale 89',
        cap: '00100',
        citta: 'Roma',
        provincia: 'RM',
        commerciale_owner_id: commercialeUser.user.id,
        note: 'Nuovo cliente da monitorare'
      }
    ];

    const { data: dealers, error: dealersError } = await supabase
      .from('dealers')
      .insert(dealersData)
      .select();

    if (dealersError) {
      console.error('Error creating dealers:', dealersError);
      throw dealersError;
    }

    console.log(`Created ${dealers.length} dealers`);

    // 4. Create orders for commerciale's dealers
    const ordersData = [];
    const orderLinesData = [];
    const paymentsData = [];

    // Ordine 1 - Da confermare
    const order1Id = `ORD-${Date.now()}-001`;
    ordersData.push({
      id: order1Id,
      dealer_id: dealers[0].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: commercialeUser.user.id,
      stato: 'da_confermare',
      importo_totale: 5500,
      importo_acconto: 1650,
      data_consegna_prevista: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      note_interna: 'Ordine urgente - cliente preferenziale',
    });

    orderLinesData.push({
      ordine_id: order1Id,
      categoria: 'Finestre',
      descrizione: 'Finestra PVC 120x150 cm',
      quantita: 4,
      prezzo_unitario: 450,
      sconto: 10,
      iva: 22,
      totale_riga: 1800,
      misure: { larghezza: 120, altezza: 150, unita: 'cm' }
    });

    orderLinesData.push({
      ordine_id: order1Id,
      categoria: 'Porte',
      descrizione: 'Porta blindata con serratura europea',
      quantita: 2,
      prezzo_unitario: 1200,
      sconto: 5,
      iva: 22,
      totale_riga: 2400,
      misure: { larghezza: 90, altezza: 210, unita: 'cm' }
    });

    // Ordine 2 - Da pagare acconto
    const order2Id = `ORD-${Date.now()}-002`;
    ordersData.push({
      id: order2Id,
      dealer_id: dealers[1].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: commercialeUser.user.id,
      stato: 'da_pagare_acconto',
      importo_totale: 8200,
      importo_acconto: 2460,
      data_consegna_prevista: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    orderLinesData.push({
      ordine_id: order2Id,
      categoria: 'Finestre',
      descrizione: 'Finestra alluminio scorrevole 200x180 cm',
      quantita: 3,
      prezzo_unitario: 1800,
      sconto: 8,
      iva: 22,
      totale_riga: 5400,
      misure: { larghezza: 200, altezza: 180, unita: 'cm' }
    });

    // Ordine 3 - In lavorazione (con acconto pagato)
    const order3Id = `ORD-${Date.now()}-003`;
    ordersData.push({
      id: order3Id,
      dealer_id: dealers[0].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: commercialeUser.user.id,
      stato: 'in_lavorazione',
      importo_totale: 12500,
      importo_acconto: 3750,
      data_consegna_prevista: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      note_interna: 'Produzione in corso',
    });

    orderLinesData.push({
      ordine_id: order3Id,
      categoria: 'Finestre',
      descrizione: 'Set finestre PVC complete per appartamento',
      quantita: 8,
      prezzo_unitario: 550,
      sconto: 12,
      iva: 22,
      totale_riga: 4400,
    });

    orderLinesData.push({
      ordine_id: order3Id,
      categoria: 'Porte',
      descrizione: 'Porta interna legno massello',
      quantita: 5,
      prezzo_unitario: 800,
      sconto: 10,
      iva: 22,
      totale_riga: 4000,
    });

    paymentsData.push({
      ordine_id: order3Id,
      tipo: 'acconto',
      importo: 3750,
      metodo: 'Bonifico bancario',
      data_pagamento: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'BON-2024-001',
    });

    // Ordine 4 - Da consegnare (acconto + parziale pagati)
    const order4Id = `ORD-${Date.now()}-004`;
    ordersData.push({
      id: order4Id,
      dealer_id: dealers[2].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: commercialeUser.user.id,
      stato: 'da_consegnare',
      importo_totale: 9800,
      importo_acconto: 2940,
      data_consegna_prevista: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      note_interna: 'Pronto per consegna',
    });

    orderLinesData.push({
      ordine_id: order4Id,
      categoria: 'Porte',
      descrizione: 'Portone blindato alta sicurezza',
      quantita: 1,
      prezzo_unitario: 3500,
      sconto: 5,
      iva: 22,
      totale_riga: 3500,
    });

    paymentsData.push({
      ordine_id: order4Id,
      tipo: 'acconto',
      importo: 2940,
      metodo: 'Bonifico bancario',
      data_pagamento: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'BON-2024-002',
    });

    paymentsData.push({
      ordine_id: order4Id,
      tipo: 'parziale',
      importo: 3000,
      metodo: 'Assegno',
      data_pagamento: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'ASS-2024-001',
    });

    // Ordine 5 - Consegnato (completamente pagato)
    const order5Id = `ORD-${Date.now()}-005`;
    ordersData.push({
      id: order5Id,
      dealer_id: dealers[1].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: commercialeUser.user.id,
      stato: 'consegnato',
      importo_totale: 6500,
      importo_acconto: 1950,
      data_consegna_prevista: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    orderLinesData.push({
      ordine_id: order5Id,
      categoria: 'Finestre',
      descrizione: 'Finestre PVC standard 100x120 cm',
      quantita: 6,
      prezzo_unitario: 420,
      sconto: 8,
      iva: 22,
      totale_riga: 2520,
    });

    paymentsData.push({
      ordine_id: order5Id,
      tipo: 'acconto',
      importo: 1950,
      metodo: 'Bonifico bancario',
      data_pagamento: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'BON-2024-003',
    });

    paymentsData.push({
      ordine_id: order5Id,
      tipo: 'saldo',
      importo: 4550,
      metodo: 'Bonifico bancario',
      data_pagamento: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'BON-2024-004',
    });

    // 5. Create orders for rivenditore
    const order6Id = `ORD-${Date.now()}-006`;
    ordersData.push({
      id: order6Id,
      dealer_id: dealers[0].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: rivenditoreUser.user.id,
      stato: 'da_confermare',
      importo_totale: 3200,
      importo_acconto: 960,
      data_consegna_prevista: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      note_rivenditore: 'Cliente urgente, priorità alta',
    });

    orderLinesData.push({
      ordine_id: order6Id,
      categoria: 'Finestre',
      descrizione: 'Finestra vasistas 80x60 cm',
      quantita: 4,
      prezzo_unitario: 280,
      sconto: 5,
      iva: 22,
      totale_riga: 1120,
    });

    const order7Id = `ORD-${Date.now()}-007`;
    ordersData.push({
      id: order7Id,
      dealer_id: dealers[0].id,
      commerciale_id: commercialeUser.user.id,
      creato_da_user_id: rivenditoreUser.user.id,
      stato: 'in_lavorazione',
      importo_totale: 4800,
      importo_acconto: 1440,
      data_consegna_prevista: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    orderLinesData.push({
      ordine_id: order7Id,
      categoria: 'Porte',
      descrizione: 'Porta interna scorrevole',
      quantita: 3,
      prezzo_unitario: 650,
      sconto: 7,
      iva: 22,
      totale_riga: 1950,
    });

    paymentsData.push({
      ordine_id: order7Id,
      tipo: 'acconto',
      importo: 1440,
      metodo: 'Contanti',
      data_pagamento: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riferimento: 'CONT-2024-001',
    });

    // Insert all data
    const { error: ordersError } = await supabase.from('orders').insert(ordersData);
    if (ordersError) {
      console.error('Error creating orders:', ordersError);
      throw ordersError;
    }
    console.log(`Created ${ordersData.length} orders`);

    const { error: linesError } = await supabase.from('order_lines').insert(orderLinesData);
    if (linesError) {
      console.error('Error creating order lines:', linesError);
      throw linesError;
    }
    console.log(`Created ${orderLinesData.length} order lines`);

    const { error: paymentsError } = await supabase.from('payments').insert(paymentsData);
    if (paymentsError) {
      console.error('Error creating payments:', paymentsError);
      throw paymentsError;
    }
    console.log(`Created ${paymentsData.length} payments`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test data seeded successfully',
        data: {
          users: {
            commerciale: {
              email: 'commerciale.test@example.com',
              password: 'TestCommerciale123!',
              id: commercialeUser.user.id
            },
            rivenditore: {
              email: 'rivenditore.test@example.com',
              password: 'TestRivenditore123!',
              id: rivenditoreUser.user.id
            }
          },
          dealers: dealers.length,
          orders: ordersData.length,
          orderLines: orderLinesData.length,
          payments: paymentsData.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in seed-test-data function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage, success: false }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
