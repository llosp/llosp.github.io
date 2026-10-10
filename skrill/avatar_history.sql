-- Histórico de fotos de perfil (rodar uma vez no SQL Editor do Supabase)
create table if not exists avatar_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  avatar_data text not null,
  created_at timestamptz not null default now()
);
create index if not exists avatar_history_profile_idx on avatar_history (profile_id, created_at desc);
alter table avatar_history disable row level security;
