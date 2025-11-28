import { supabase } from '../config/supabaseClient';

class BeachService {
  /**
   * Mengambil daftar pantai dengan filter opsional
   */
  async getBeaches({ search, province, minRating } = {}) {
    let query = supabase
      .from('beaches')
      .select('*')
      .order('name', { ascending: true });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    if (province) {
      query = query.eq('province', province);
    }
    if (minRating) {
      query = query.gte('rating', minRating);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching beaches:', error);
      // Fallback data kosong jika terjadi error koneksi/tabel belum ada
      return [];
    }
    return data;
  }

  /**
   * Mengambil detail pantai beserta review terkait
   */
  async getBeachById(id) {
    const { data, error } = await supabase
      .from('beaches')
      .select(`
        *,
        reviews (
          id, rating, comment, user_email, created_at
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Toggle status wishlist untuk user tertentu
   */
  async toggleWishlist(beachId, userId) {
    // Cek apakah sudah ada di wishlist
    const { data } = await supabase
      .from('wishlists')
      .select('*')
      .eq('beach_id', beachId)
      .eq('user_id', userId)
      .single();

    if (data) {
      // Jika ada, hapus (Unlike)
      await supabase.from('wishlists').delete().eq('id', data.id);
      return false; 
    } else {
      // Jika tidak ada, tambah (Like)
      await supabase.from('wishlists').insert([{ beach_id: beachId, user_id: userId }]);
      return true;
    }
  }

  /**
   * Mengambil semua pantai yang ada di wishlist user
   */
  async getUserWishlist(userId) {
    // Join tabel wishlists dengan beaches
    const { data, error } = await supabase
      .from('wishlists')
      .select('beach_id, beaches(*)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
    // Return hanya objek pantainya saja
    return data.map(item => item.beaches);
  }

  /**
   * Menambahkan review baru
   */
  async addReview(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select();
      
    if (error) throw error;
    return data;
  }
}

export default new BeachService();